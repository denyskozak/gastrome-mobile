
export const Home = () => {
    const url = 'https://apps.apple.com/us/app/gastro-me-new-video-recipes/id1660297807?l=pt-BR&platform=ipad';

    const openAppStore = () => window.open(url, '_blank');

    return (
        <div  style={{ display: 'flex', gap: '24px', "flex-direction": 'column', "align-items": "center", "justify-content": "center", width: '100%', height: '100%', "background-color": 'black' }}>
            <img on:click={openAppStore} src="/mobile.webp" width={325} height={500}/>
            <img on:click={openAppStore} src="/appstore.webp" width={160} height={50}/>


        </div>
    )
}