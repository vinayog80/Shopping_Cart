import { useState, useEffect } from "react";

export const useShoppingCartSource = (ConfigUrl) => {
    const [shopData, setShopData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadShopData = async () => {
        setIsLoading(!isLoading);
        try {
            const response = await fetch(ConfigUrl);
            const data = await response.json();
            if (!response.ok) {
                return;
            }
            else {
                setShopData(data);
                setIsLoading(false);
            }
        } catch (error) {
            setError(error);
            console.log(error.message);
        }
    }

    useEffect(() => {
        loadShopData();
    }, [ConfigUrl]);

    return { shopData, isLoading, error, setShopData, setIsLoading, setError };
}