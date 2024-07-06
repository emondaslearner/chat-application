// ** Reducers Imports
import themeConfig from "./actions/themeConfig"
import siteConfig from "./actions/siteConfig"
import auth from "./actions/auth";
import posts from "./actions/post"

const rootReducer = {
    themeConfig,
    siteConfig,
    auth,
    posts
}

export default rootReducer
