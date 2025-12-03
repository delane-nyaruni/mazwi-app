import { useEffect } from 'react'

const TabTheme = ({ color }) => {
    useEffect(() => {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', color);
        } else{
            const meta = document.createElement('meta');
            meta.name = "theme-color";
            meta.content = color;
            document.head.appendChild(meta);
        }
    }, [color]);
  return null;
}

export default TabTheme;