// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout'
import IndexRoute from './IndexRoute'
import ResultsRoute from './Results'
import RulesRoute from './Rules'
import AboutRoute from './About'
import PrizesRoute from './Prizes'
import VoteRoute from './Vote'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: IndexRoute(store),
  childRoutes: [
    ResultsRoute(store),
    RulesRoute(store),
    AboutRoute(store),
    PrizesRoute(store),
    VoteRoute(store)
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
