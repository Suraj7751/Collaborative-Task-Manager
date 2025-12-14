import { useEffect } from "react";
import { socket } from "../utils/socket";
import { useQueryClient } from "@tanstack/react-query";

export const useSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("task:created", () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("task:updated", () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("task:assigned", (task) => {
      alert(`New task assigned: ${task.title}`);
    });

    return () => {
      socket.off();
    };
  }, []);
};
