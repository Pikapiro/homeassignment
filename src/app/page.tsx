"use client";
import Post from "@/components/singlePost/Post";
import React, { useEffect, useState, useCallback } from "react";
import "./pag.css";

export default function Home() {
    interface FeedItem {
        id: string;
        userId: string;
        username: string;
        avatar: string;
        shopName: string;
        shopId: string;
        images: string[];
        comments: number;
        date: string;
        text: string;
        likes: number;
        didLike: boolean;

    }

    const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const API_URL = "https://backend.tedooo.com/hw/feed.json";

    let throttleTimeout: NodeJS.Timeout;

    const fetchFeedData = useCallback(async () => {
        if (!hasMore || isLoading) return;
        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}?skip=${skip}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data && Array.isArray(data.data)) {
                setFeedItems((prevItems) => [...prevItems, ...data.data]);
                setSkip((prevSkip) => prevSkip + data.data.length);
                setHasMore(data.hasMore);
            } else {
                console.error("Unexpected data format:", data);
            }
        } catch (error) {
            console.error("Error fetching feed data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [skip, hasMore, isLoading]);

    useEffect(() => {
        fetchFeedData();
    }, []);

    useEffect(() => {
        const throttledScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                clearTimeout(throttleTimeout);
                throttleTimeout = setTimeout(fetchFeedData, 200);
            }
        };

        window.addEventListener("scroll", throttledScroll);
        return () => {
            clearTimeout(throttleTimeout);
            window.removeEventListener("scroll", throttledScroll);
        };
    }, [fetchFeedData]);



    return (
        <div id="feed-container">
            {feedItems.map((item) => (
                <Post key={item.id} {...item} data-itemid={item.id} className="feed-item" />
            ))}
            {isLoading && <div className="loader">Loading...</div>}
        </div>
    );
}
