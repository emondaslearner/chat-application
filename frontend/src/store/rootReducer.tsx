// ** Reducers Imports
import themeConfig from "./actions/themeConfig"
import siteConfig from "./actions/siteConfig"
import auth from "./actions/auth";
import posts from "./actions/post"
import friend from "./actions/friend";

const rootReducer = {
    themeConfig,
    siteConfig,
    auth,
    posts,
    friend
}

export default rootReducer
