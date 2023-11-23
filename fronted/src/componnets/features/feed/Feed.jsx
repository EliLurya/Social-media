import { Box } from "@mui/material";
import { Post } from "./posts/posts/Post";
import Add from "../newPost/Add";

// Feed component represents the main area where posts are displayed
const Feed = () => {
  return (
    <>
      {/* Main container for the feed */}
      <Box flex={6} p={2}>
        {/* Container for the 'Add' component */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
            mb: 4,
            mr: 2,
          }}
        >
          <Add /> {/* Component to add a new post */}
        </Box>
        <Post /> {/* Post component to display individual posts */}
      </Box>
    </>
  );
};

export default Feed;
