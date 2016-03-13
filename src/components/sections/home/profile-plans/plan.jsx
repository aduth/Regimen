/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { removePlanFromProfile } from 'state/profile/actions';
import { getProfilePlanProgress } from 'state/profile/selectors';
import PlanName from 'components/sections/home/plan-name';
import Button from 'components/ui/button';
import Icon from 'components/ui/icon';

function ProfilePlan( { planId, workout, removePlanFromProfile } ) {
	function confirmRemove() {
		if ( confirm( 'Are you sure you want to remove this plan?' ) ) {
			removePlanFromProfile( planId );
		}
	}

	return (
		<div className="profile-plans__plan">
			<span className="profile-plans__plan-name">
				<PlanName planId={ planId } />
			</span>
			<nav className="profile-plans__plan-actions">
				<Button success to={ `/plan/${ planId }/workout/${ workout }` }>
					<Icon icon="play">Resume</Icon>
				</Button>
				<Button danger onClick={ confirmRemove }>
					<Icon icon="trash">Remove</Icon>
				</Button>
			</nav>
		</div>
	);
}

ProfilePlan.propTypes = {
	planId: PropTypes.string.isRequired,
	workout: PropTypes.number,
	removePlanFromProfile: PropTypes.func
};

ProfilePlan.defaultProps = {
	removePlanFromProfile: () => {}
};

export default connect( ( state, ownProps ) => {
	return {
		workout: getProfilePlanProgress( state, ownProps.planId )
	};
}, ( dispatch ) => {
	return bindActionCreators( {
		removePlanFromProfile
	}, dispatch );
} )( ProfilePlan );
