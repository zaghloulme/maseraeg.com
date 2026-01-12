import homepage from './homepage'
import siteSettings from './siteSettings'

import hero from './hero'
import features, { featureItem } from './features'
import seo from './seo'

// Menu schemas
import branch from './branch'
import menuCategory from './menuCategory'
import menuItem from './menuItem'


export const schemaTypes = [
    siteSettings,
    hero,
    features,
    featureItem,
    seo,
    homepage,
    // Menu
    branch,
    menuCategory,
    menuItem,
]

