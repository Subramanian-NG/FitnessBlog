'use client'
import { useState, useEffect } from "react";
import PostPreview from "../ui/components/PostPreview";
import MyPostPreview from "../ui/components/MyPostPreview";
import { FaCalendarPlus, FaPlus, FaSearchPlus, FaShareAlt, FaShareSquare } from "react-icons/fa";
import CreateEditPost from "../ui/components/CreateEditPost";
import { useSession } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bgImage from '../assets/image.jpg'; 
interface Posts {
    posts: Post[];
}

interface Post {
    id?: number;
    title: string;
    content: string;
    category: string;
}

export default function Page() {
    const { data: session, status } = useSession();
    const [categories, setCategories] = useState<any[]>(['My posts', 'My bookmarks']);
    const [selectedCategory, setSelectedCategory] = useState<String>();
    const [isCreateEditVisible, setIsCreateEditVisible] = useState<any>(false);
    const [showBookMarkPosts, setShowBookMarkPosts] = useState<any>(false);
    const [showMyPosts, setShowMyPosts] = useState<any>(false);
    const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
    const [resetKey, setResetKey] = useState<number>(0);

    const [posts, setPosts] = useState<Posts[]>([]);
    const [bookmarkedPosts, setBookmarkedPosts] = useState<Posts[]>([]);

    useEffect(() => {
        if (!isCreateEditVisible) {
            setSelectedPost(undefined);
        }
    }, [isCreateEditVisible]);

    useEffect(() => {
        if (session?.user?.email) {
            getDataForCurrentUser();
        }
    }, [session?.user?.email]);

    async function getDataForCurrentUser() {
        const posts1 = await fetch(`http://localhost:3000/api/blogs?email=` + session?.user?.email, {
            next: { revalidate: 0 },
        }).then((res) => res.json());
        setPosts(posts1.posts);
    }

    async function getBookmarkedPostsForUser() {
        const userId = session?.user?.id;
        const res = await fetch(`/api/bookmarks?userId=${userId}`, {
            next: { revalidate: 0 },
        });
        const data = await res.json();

        if (res.ok) {
            setBookmarkedPosts(data.bookmarkedPosts);
        } else {
            console.error('Error fetching bookmarked posts:', data.error);
        }
    }

    async function postData(new_post: Post) {
        const formData = new FormData();
        formData.append('owner_id', session?.user?.email!);
        formData.append('title', new_post.title);
        formData.append('content', new_post.content);
        formData.append('category', new_post.category);
        const response = await fetch('http://localhost:3000/api/blogs', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            console.error('Error:', response.statusText);
            toast.error('Error saving post: ' + response.statusText);
            return;
        }

        const result = await response.json();
        toast.success('Post saved successfully!');
        handleCategoryChange('My posts');
        setResetKey(resetKey + 1); 
        getDataForCurrentUser(); 
    }

    async function postUpdatedData(new_post: Post) {
        const formData = new FormData();
        formData.append('owner_id', session?.user?.email!);
        if (new_post._id) {
            formData.append('id', new_post._id.toString());
        }
        formData.append('title', new_post.title);
        formData.append('content', new_post.content);
        formData.append('category', new_post.category);
        const response = await fetch('http://localhost:3000/api/blogs', {
            method: 'PUT',
            body: formData,
        });

        if (!response.ok) {
            console.error('Error:', response.statusText);
            toast.error('Error saving post: ' + response.statusText);
            return;
        }

        const result = await response.json();
        toast.success('Post updated successfully!');
        handleCategoryChange('My posts'); 
        setResetKey(resetKey + 1); 
        getDataForCurrentUser(); 
    }

    const handleCategoryChange = (category: string) => {
        setShowBookMarkPosts(false);
        setShowMyPosts(false);
        setIsCreateEditVisible(false);
        setSelectedCategory(category);
        if (category === "My posts") {
            setShowMyPosts(true);
            getDataForCurrentUser();
        }
        if (category === "My bookmarks") {
            setShowBookMarkPosts(true);
            getBookmarkedPostsForUser();
        }
    };

    const handleSavePost = (post: Post) => {
        if (selectedPost != null) {
            postUpdatedData(post);
        } else {
            postData(post);
        }
    };

    const handlePostClick = (post: Post) => {
        setSelectedPost(post);
        setIsCreateEditVisible(true);
        setShowBookMarkPosts(false);
        setSelectedCategory("");
        setShowMyPosts(false);
    };

    return (
        <div
            className="min-h-screen p-6 rounded-lg shadow-lg"
            style={{
                backgroundImage: `url(${bgImage.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="flex mb-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`mr-2 px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${
                            selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white'
                        }`}
                        onClick={() => handleCategoryChange(category)}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
                <button
                    className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
                    onClick={() => { setIsCreateEditVisible(true); setShowBookMarkPosts(false); setShowMyPosts(false); setSelectedCategory(""); setSelectedPost(undefined); }}
                >
                    <FaPlus />
                    <span>Add Post</span>
                </button>
            </div>
            {showMyPosts && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <MyPostPreview key={post.id} post={post} onClick={() => handlePostClick(post)} />
                    ))}
                </div>
            )}
            {isCreateEditVisible && (
                <CreateEditPost existingPost={selectedPost} onSave={handleSavePost} resetKey={resetKey} />
            )}
            {showBookMarkPosts && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {bookmarkedPosts.map((post) => (
                        <MyPostPreview key={post.id} post={post} />
                    ))}
                </div>
            )}
            <ToastContainer />
        </div>
    );
}
