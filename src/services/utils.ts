let scrollInterval: any

class Utils {
    public static scrollToTop(scrollDuration: number) {
        clearInterval(scrollInterval)

        const scrollStep = -window.scrollY / (scrollDuration / 15)

        scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval)
            }
        }, 15)
    }
}

export default Utils
