// ** Reducers Imports
import themeConfig from "./actions/themeConfig"
import siteConfig from "./actions/siteConfig"
import auth from "./actions/auth";
import posts from "./actions/post"
import friend from "./actions/friend";
import feeds from "./actions/feeds";

const rootReducer = {
    themeConfig,
    siteConfig,
    auth,
    posts,
    friend,
    feeds
}

export default rootReducer
