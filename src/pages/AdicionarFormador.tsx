import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface User {
    id: string;
    name: string;
    email?: string;
}

const Home = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/users", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTurnIntoTeacher = async (userId: string) => {
        try {
            const response = await fetch("/api/turn-into-teacher", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ userId })
            });

            if (!response.ok) {
                throw new Error("Failed to promote user");
            }

            alert("User turned into teacher!");
        } catch (error) {
            console.error("Error turning into teacher:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User List</h1>

            <ScrollArea className="w-full overflow-x-auto whitespace-nowrap">
                <div className="flex gap-4">
                    {loading ? (
                        <p>Loading users...</p>
                    ) : (
                        users.map((user) => (
                            <Card
                                key={user.id}
                                className="min-w-[300px] h-[120px] flex justify-between items-center p-4"
                            >
                                <CardContent className="flex-1">
                                    <p className="text-lg font-semibold">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {user.email || "email@example.com"}
                                    </p>
                                </CardContent>
                                <Button
                                    onClick={() => handleTurnIntoTeacher(user.id)}
                                    className="ml-4"
                                >
                                    Turn into Teacher
                                </Button>
                            </Card>
                        ))
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};

export default Home;
