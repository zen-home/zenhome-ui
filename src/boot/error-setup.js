import { boot } from 'quasar/wrappers'
import { ZCatch } from 'src/utils/z-catch'
import { ZError } from 'src/utils/z-error'

export default boot(async () => {
  ZCatch.addTransport(() => ({
    transportType: ZError.transports.LOG,
    fn (e) {
      console.error(e)
    }
  }))
})
