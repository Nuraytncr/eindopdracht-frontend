export function navigateWithTimeOut(link, navigate) {
    const timeoutId = setTimeout(() => {
        navigate(link);
    }, 1500);

    return () => clearTimeout(timeoutId);
};

export function navigateTo(link, navigate) {
        return navigate(link);
};
