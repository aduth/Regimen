/**
 * External dependencies
 */

import React, { Component } from 'react';

/**
 * Internal dependencies
 */

import Page from 'components/layout/page';
import Content from 'components/layout/content';
import AddViaRoutine from './add-via-routine';
import AddViaId from './add-via-id';

export default class NewPlanRoute extends Component {
	render() {
		return (
			<Page title="Create Plan">
				<Content>
					<AddViaRoutine />
					<AddViaId />
				</Content>
			</Page>
		);
	}
}
