/**
 * External dependencies
 */

import { includes, get } from 'lodash';

/**
 * Internal dependencies
 */

import { ROUTE_PATH_PUSH, ROUTE_PATH_REPLACE } from 'state/action-types';
import { replaceRoutePath } from './actions';

/**
 * Action types which affect route location.
 *
 * @type {Array}
 */
const ROUTE_CHANGE_TYPES = [ ROUTE_PATH_PUSH, ROUTE_PATH_REPLACE ];

/**
 * Redux middleware used in synchronizing Redux routing state with History API.
 *
 * @param  {Function} store.dispatch Store instance dispatch
 * @param  {Function} store.getState Store instance state getter
 * @return {Function}                Redux middleware
 */
export default ( { dispatch } ) => {
	window.addEventListener( 'popstate', function( event ) {
		if ( event.state && event.state.path ) {
			dispatch( replaceRoutePath( event.state.path ) );
		}
	} );

	return ( next ) => ( action ) => {
		const { type, path } = action;
		if ( includes( ROUTE_CHANGE_TYPES, type ) ) {
			const historyFn = ROUTE_PATH_PUSH === type ? 'pushState' : 'replaceState';
			if ( 'ROUTE_PATH_PUSH' !== type || path !== get( history.state, 'path' ) ) {
				history[ historyFn ]( { path }, null, path );
			}

			window.scrollTo( 0, 0 );
		}

		return next( action );
	};
};
