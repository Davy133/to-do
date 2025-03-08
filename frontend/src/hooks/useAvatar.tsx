import { useState, useEffect } from "react";

import api from "../services/api";

export const useAvatar = () => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const response = await api.get("/user/profile");
                // const userId = response.data?.data?.id;
                const gravatarUrl = response.data?.data?.avatar_url;

                if (!gravatarUrl) return;

                const cachedAvatars = JSON.parse(localStorage.getItem("avatarCache") || "{}");

                if (cachedAvatars["avatar_url"]) {
                    setAvatarUrl(cachedAvatars["avatar_url"]);
                    return;
                }

                const newCache = { ...cachedAvatars, ["avatar_url"]: gravatarUrl };
                localStorage.setItem("avatarCache", JSON.stringify(newCache));

                setAvatarUrl(gravatarUrl);
            } catch (error) {
                console.error("Error fetching avatar:", error);
            }
        };

        fetchAvatar();
    }, []);

    return avatarUrl;
};
