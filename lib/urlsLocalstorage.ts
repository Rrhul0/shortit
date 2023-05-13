import { UrlWithPaths } from '../components/contexts/URLsContext'

export const getUrlsLocalstorage = () => {
    const urlsLocalstorage = localStorage.getItem('urls')
    let urls: UrlWithPaths[] = []
    if (urlsLocalstorage) {
        urls = JSON.parse(urlsLocalstorage)
        if (!Array.isArray(urls)) urls = []
    }
    return urls
}

export const setUrlsLocalstorage: (urls: UrlWithPaths) => void = urls => {
    const urlsLocalstorage = getUrlsLocalstorage()
    localStorage.setItem('urls', JSON.stringify([...urlsLocalstorage, urls]))
}
