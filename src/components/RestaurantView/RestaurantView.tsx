import { useMutation, useQuery } from "@tanstack/react-query";
import { getRestaurants, Restaurant, updateRestaurantRating } from "../../api/api";
import { Cards } from "../Cards/Cards";
import { Loader } from "../Loader/Loader";
import { queryClient } from "../../api/queryClient";
import { useMemo, useState } from "react";
import { InputSearch } from "../InputSearch/InputSearch";


export const RestaurantView = () => {
    const [search, setSearch] = useState<string>("");

    const restaurantQuery = useQuery({
        queryKey: ["restaurantList"],
        queryFn: getRestaurants,
    }, queryClient);

    const restaurants: Restaurant[] = restaurantQuery.data ?? [];

    const mutation = useMutation({
        mutationFn: ({ id, raiting }: { id: string, raiting: number }) => updateRestaurantRating({ id, raiting }),
        onMutate: async ({ id, raiting }) => {
            await queryClient.cancelQueries({
                queryKey: ["restaurantList"]
            })
            const previous = queryClient.getQueryData<Restaurant[]>(["restaurantList"]);

            queryClient.setQueryData<Restaurant[] | undefined>(["restaurantList"], old =>
                old?.map(r => (r.id === id ? { ...r, raiting } : r))
            );

            return { previous };
        },
        onError: (_err, _variables, context: any) => {
            if (context?.previous) {
                queryClient.setQueryData(["restaurantList"], context.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurantList"] });
        },
    }, queryClient)

    const handleRaitingClick = (id: string, newRaiting: number, currentRating: number) => {
        if (newRaiting === currentRating) return;
        mutation.mutate({ id, raiting: newRaiting });
    };

    const filtered = useMemo(() => {
        const q = search.trim().toLocaleLowerCase();
        if (!q) return restaurants;
        return restaurants.filter(r => r.name.toLocaleLowerCase().includes(q));
    }, [restaurants, search])

    if (restaurantQuery.isLoading) return <Loader />;
    if (restaurantQuery.isError) return (
        <div>
            <span>Произошла ошибка</span>
        </div>
    );

    return (
        <div>
            <InputSearch value={search} onChange={setSearch} />
            <Cards restaurantList={filtered} onRate={(id, newRating, currentRating) => handleRaitingClick(id, newRating, currentRating)} />;
        </div>
    )
};