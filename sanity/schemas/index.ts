import siteSettings from './siteSettings'

import hero from './hero'
import features, { featureItem } from './features'
import seo from './seo'

// Menu schemas
import branch from './branch'
import menuCategory from './menuCategory'
import menuItem from './menuItem'
import privacyPolicy from './privacyPolicy'


export const schemaTypes = [
    siteSettings,
    hero,
    features,
    featureItem,
    seo,
    // Menu
    branch,
    menuCategory,
    menuItem,
    // Legal
    privacyPolicy,
]

