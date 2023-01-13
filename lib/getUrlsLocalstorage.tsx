import { UrlWithPaths } from '../components/contexts/URLsContext'

const getUrlsLocalstorage = () => {
    const urlsLocalstorage = localStorage.getItem('urls')
    let urls: UrlWithPaths[] = []
    if (urlsLocalstorage) {
        urls = JSON.parse(urlsLocalstorage)
        if (!Array.isArray(urls)) urls = []
    }
    return urls
}

export default getUrlsLocalstorage
