/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { setWorkoutRoute } from 'state/routing/actions';
import { setProfilePlanProgress } from 'state/profile/actions';
import { setWorkout } from 'state/ui/actions';
import Content from 'components/layout/content';
import Workout from './workout';
import WorkoutPagination from './workout-pagination';

class WorkoutRoute extends Component {
	static propTypes = {
		params: PropTypes.object.isRequired,
		setWorkout: PropTypes.func,
		setProfilePlanProgress: PropTypes.func,
		setWorkoutRoute: PropTypes.func
	};

	static defaultProps = {
		setProfilePlanProgress: () => {},
		setWorkoutRoute: () => {}
	};

	componentDidMount() {
		this.setWorkoutState();
	}

	componentDidUpdate() {
		this.setWorkoutState();
	}

	setWorkoutState() {
		const { params, setWorkout, setProfilePlanProgress, setWorkoutRoute } = this.props;
		const workout = parseInt( this.props.params.workout, 10 );

		if ( workout > 0 ) {
			setProfilePlanProgress( params.planId, workout );
			setWorkout( workout );
		} else {
			setWorkoutRoute( params.planId, 1 );
		}
	}

	render() {
		return (
			<div>
				<WorkoutPagination />
				<Content>
					<Workout />
				</Content>
			</div>
		);
	}
}

export default connect( null, ( dispatch ) => {
	return bindActionCreators( {
		setProfilePlanProgress,
		setWorkout,
		setWorkoutRoute
	}, dispatch );
} )( WorkoutRoute );
