import React, { useState, useEffect } from "react";
import axios from "axios";

interface FriendProps {
  username: string;
}

const Friends = ({ username }: FriendProps) => {
  const [friends, setFriends] = useState<
    { name: string; avatar: string | null; username: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (username.trim().length > 0) {
      setIsLoading(true);
      setError("");

      // Step 1: Get the list of friends' userIDs for the given username
      axios
        .get("http://127.0.0.1:5000/getfriends", { params: { user: username } })
        .then((res) => {
          const friendIDs = Array.isArray(res.data.friendsIDs)
            ? res.data.friendsIDs
            : [];

          // Step 2: Fetch the profiles (names) of the friends using their userIDs
          const fetchProfiles = friendIDs.map(
            (friendID: number) =>
              axios
                .get("http://127.0.0.1:5000/getprofilebyid", {
                  params: { userid: friendID },
                })
                .then((response) => {
                  const {
                    firstName,
                    lastName,
                    username: friendUsername,
                  } = response.data;
                  const avatar = "/src/assets/UI_Files/User_Circle.png"; // default avatar
                  return {
                    name: `${firstName} ${lastName} (${friendUsername})`,
                    avatar,
                    username: friendUsername,
                  };
                })
                .catch(() => ({
                  name: "Unknown Friend",
                  avatar: null,
                  username: "",
                })) // In case of error
          );

          // Wait for all profile fetches to complete
          Promise.all(fetchProfiles)
            .then((friendsWithNames) => {
              setFriends(friendsWithNames);
            })
            .catch(() => {
              setError("Failed to fetch some friend profiles.");
            });
        })
        .catch((err) => {
          setError("Failed to fetch friends.");
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [username]);

  const handleRemoveFriend = (friendUsername: string) => {
    axios
      .post("http://127.0.0.1:5000/removefriend", {
        user: username,
        friend: friendUsername,
      })
      .then((response) => {
        setFriends(
          friends.filter((friend) => friend.username !== friendUsername)
        );
      })
      .catch((err) => {
        setError("Failed to remove friend.");
        console.error(err);
      });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-3xl">
        Loading friends for {username}...
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex justify-center items-center min-h-screen min-w-screen text-white text-3xl">
      <div className="text-center bg-transparent rounded-2xl shadow-lg max-w-[1930px] mx-auto h-[70vh] overflow-hidden flex flex-col">
        <div className="overflow-y-auto flex custom-scrollbar px-[50px] py-[50px]">
          <div className="grid grid-cols-4 gap-x-[30px]">
            {friends.map((friend, index) => (
              <div
                key={index}
                className="flex flex-col items-center transform transition-all duration-300 ease-in-out hover:scale-105"
              >
                <div className="bg-navbar-button-select-color bg-opacity-60 rounded-2xl shadow-lg w-[300px] px-[30px] py-[30px] mb-[50px] hover:shadow-2xl hover:bg-opacity-100 flex flex-col items-center">
                  {/* Avatar */}
                  <div className="relative flex flex-col items-center">
                    <img
                      src={
                        friend.avatar || "/src/assets/UI_Files/User_Circle.png"
                      }
                      alt={friend.name}
                      className="w-[150px] h-[150px] object-cover rounded-full"
                    />
                    {/* Line Separator */}
                    <img
                      src="/src/assets/UI_Files/Line.png"
                      alt="Separator"
                      className="w-[200px] h-[2px] mt-[20px]"
                    />
                  </div>

                  {/* Friend Name */}
                  <div className="mt-[20px] text-orange-500 text-lg font-bold text-center break-words w-[210px]">
                    {friend.name}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 mt-[20px]">
                    {/* Show Remove button only for friends */}
                    <button
                      onClick={() => handleRemoveFriend(friend.username)}
                      className="w-[55px] h-[55px] flex justify-center items-center bg-gray-800 bg-opacity-50 rounded-md hover:bg-orange-500 hover:bg-opacity-30 shadow-xl"
                    >
                      <img
                        src="/src/assets/UI_Files/User_Remove.png"
                        alt="Remove"
                        className="w-[35px] h-[35px]"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
