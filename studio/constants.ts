// import {BsCardHeading, BsImages, BsSpeedometer2} from 'react-icons/bs' // !!! TODODEV lucide-icons

export const BASE_URL = 'kit.pages.dev' // to be replaced by actual base URL

export const GROUPS = [
  {
    default: true,
    name: 'content',
    title: 'Editorial content',
    // icon: BsCardHeading,
  },
  {
    name: 'iconography',
    title: 'Iconography',
    // icon: BsImages,
  },
  {
    name: 'seo',
    title: 'SEO & Social media',
    // icon: BsSpeedometer2,
  },
]

export const LINKS = [
  {type: 'linkEmail'},
  {type: 'linkExternal'},
  {type: 'linkInternal'},
  {type: 'linkPhone'},
]

export const SECTIONS = [{type: 'section'}]

export const PAGE_REFERENCES = [
  {type: 'home'},
  // {type: 'imprint'} // not yet implemented
]
