export default {
 onUpdate: registration => {
   registration.unregister().then(() => {
   window.location.reload()
  })
 },
}