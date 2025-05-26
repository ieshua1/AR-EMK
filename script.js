async function checkARSupport() {
    const statusEl = document.getElementById("ar-support-status");
    const ua = navigator.userAgent;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);

    if (isIOS && isSafari) {
        statusEl.innerText = "✅ Поддержка ARKit (Quick Look) доступна.";
        return true;
    }

    if ("xr" in navigator && isMobile) {
        try {
            const supported =
                await navigator.xr.isSessionSupported("immersive-ar");
            statusEl.innerText = supported
                ? "✅ Поддержка ARCore (WebXR) доступна."
                : "❌ WebXR есть, но AR не поддерживается.";
            return supported;
        } catch (e) {
            statusEl.innerText = "⚠️ Ошибка при проверке WebXR.";
            return false;
        }
    }

    statusEl.innerHTML =
        "❌ Ваше устройство/браузер не поддерживает AR. Только 3D просмотр. <a href='why.html'>Почему так?</a>";
    return false;
}

checkARSupport();

async function activateXR() {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const gl = canvas.getContext("webgl", { xrCompatible: true });
}
