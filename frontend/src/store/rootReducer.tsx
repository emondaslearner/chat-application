// ** Reducers Imports
import themeConfig from "./actions/themeConfig"
import siteConfig from "./actions/siteConfig"
import auth from "./actions/auth"

const rootReducer = {
    themeConfig,
    siteConfig,
    auth
}

export default rootReducer
