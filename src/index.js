/**
 * External dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { install as installOfflineRuntime } from 'offline-plugin/runtime';

/**
 * Internal dependencies
 */

import { createReduxStore } from 'state';
import routes from 'routes';
import Root from 'layout/root';
import { initializeRemoteSync } from 'db';
import configureStandalone from 'lib/standalone';
import FastClick from 'fastclick';

/**
 * Stylesheets
 */

import 'assets/stylesheets/main.scss';

/**
 * Store initialization
 */

const store = createReduxStore();
initializeRemoteSync( store );
configureStandalone( store );

/**
 * Offline capability
 */

if ( ! global.__DEV__ ) {
	installOfflineRuntime();
}

/**
 * FastClick
 */

FastClick.attach( document.body );

/**
 * Render
 */

ReactDOM.render(
	<Root store={ store }>
		<Router
			history={ syncHistoryWithStore( browserHistory, store ) }
			routes={ routes } />
	</Root>,
	document.getElementById( 'app' )
);
