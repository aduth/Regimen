/**
 * Internal dependencies
 */

import { roundToNearestPlate } from 'lib/weight';
import { FocusTypes, ProgressionTypes, Weekdays, Exercises } from 'routines/constants';

/**
 * Program Utility
 */

function getMax( testWeight, testReps, week, prWeek ) {
	return ( ( ( testWeight / ( 1.0278 - ( 0.0278 * testReps ) ) ) * ( 1.0278 - ( 0.0278 * 5 ) ) ) * Math.pow( 1 / 1.025, prWeek - 1 ) ) * Math.pow( 1.025, week - 1 );
}

/**
 * Program Constants
 */

export const name = 'Madcow 5x5';

export const description = 'Originally created by Bill Starr, the writer of the book "The Strongest Shall Survive" this program is great for adding muscle mass and increasing overall strength and fitness levels.';

export const focus = FocusTypes.STRENGTH;

export const progression = ProgressionTypes.WEEKLY;

export const weekdays = [
	Weekdays.MONDAY,
	Weekdays.WEDNESDAY,
	Weekdays.FRIDAY
];

export const form = {
	schema: {
		type: 'object',
		properties: {
			prWeek: {
				title: 'Personal record week',
				description: 'Week during which you should reach your current personal record',
				type: 'integer',
				default: 4,
				minimum: 1
			},
			setIncrement: {
				title: 'Set increment percentage',
				description: 'Weight increase percentage between sets',
				type: 'number',
				default: 12,
				minimum: 1,
				maximum: 100,
				multipleOf: 1
			},
			minPlateWeight: {
				title: 'Minimum plate weight',
				description: 'The smallest available plate weight',
				type: 'number',
				default: 2.5,
				minimum: 1,
				multipleOf: 0.5
			},
			tests: {
				title: 'Current maximums',
				description: 'For each exercise, provide your current maximum weight and repetitions',
				type: 'object',
				properties: {
					squat: {
						title: 'Squat',
						type: 'object',
						properties: {
							weight: {
								title: 'Weight',
								type: 'number',
								default: 1,
								multipleOf: 0.5,
								minimum: 1
							},
							reps: {
								title: 'Repetitions',
								type: 'integer',
								default: 1
							}
						}
					},
					bench: {
						title: 'Bench Press',
						type: 'object',
						properties: {
							weight: {
								title: 'Weight',
								type: 'number',
								default: 1,
								multipleOf: 0.5,
								minimum: 1
							},
							reps: {
								title: 'Repetitions',
								type: 'integer',
								default: 1
							}
						}
					},
					row: {
						title: 'Row',
						type: 'object',
						properties: {
							weight: {
								title: 'Weight',
								type: 'number',
								default: 1,
								multipleOf: 0.5,
								minimum: 1
							},
							reps: {
								title: 'Repetitions',
								type: 'integer',
								default: 1
							}
						}
					},
					deadlift: {
						title: 'Deadlift',
						type: 'object',
						properties: {
							weight: {
								title: 'Weight',
								type: 'number',
								default: 1,
								multipleOf: 0.5,
								minimum: 1
							},
							reps: {
								title: 'Repetitions',
								type: 'integer',
								default: 1
							}
						}
					},
					press: {
						title: 'Overhead Press',
						type: 'object',
						properties: {
							weight: {
								title: 'Weight',
								type: 'number',
								default: 1,
								multipleOf: 0.5,
								minimum: 1
							},
							reps: {
								title: 'Repetitions',
								type: 'integer',
								default: 1
							}
						}
					}
				}
			}
		}
	},
	uiSchema: {
		tests: {
			squat: {
				classNames: 'form__inline-flex'
			},
			bench: {
				classNames: 'form__inline-flex'
			},
			row: {
				classNames: 'form__inline-flex'
			},
			deadlift: {
				classNames: 'form__inline-flex'
			},
			press: {
				classNames: 'form__inline-flex'
			}
		}
	}
};

/**
 * Program Generators
 */

export function exercises( workout ) {
	workout = workout % weekdays.length;

	switch ( workout ) {
		case 1:
			return [
				Exercises.SQUAT,
				Exercises.BENCH_PRESS,
				Exercises.ROW
			];

		case 2:
			return [
				Exercises.SQUAT,
				Exercises.OVERHEAD_PRESS,
				Exercises.DEADLIFT
			];

		case 0:
			return [
				Exercises.SQUAT,
				Exercises.BENCH_PRESS,
				Exercises.ROW
			];
	}
}

export function sets( plan, workout, exercise ) {
	const { prWeek, setIncrement, minPlateWeight } = plan.form;
	const week = Math.floor( ( workout - 1 ) / weekdays.length ) + 1;
	const weekday = weekdays[ ( workout - 1 ) % weekdays.length ];

	let sets;
	switch ( exercise ) {
		case Exercises.SQUAT:
			const { testSquatWeight, testSquatReps } = plan.form;
			const squatMax = getMax( testSquatWeight, testSquatReps, week, prWeek );
			switch ( weekday ) {
				case Weekdays.MONDAY:
					sets = [
						{
							reps: 5,
							weight: squatMax * ( 1 - ( setIncrement * 4 ) )
						},
						{
							reps: 5,
							weight: squatMax * ( 1 - ( setIncrement * 3 ) )
						},
						{
							reps: 5,
							weight: squatMax * ( 1 - ( setIncrement * 2 ) )
						},
						{
							reps: 5,
							weight: squatMax * ( 1 - setIncrement )
						},
						{
							reps: 5,
							weight: squatMax
						}
					];
					break;

				case Weekdays.WEDNESDAY:
					sets = [
						{
							reps: 5,
							weight: squatMax * ( 1 - ( setIncrement * 4 ) )
						},
						{
							reps: 5,
							weight: squatMax * ( 1 - ( setIncrement * 3 ) )
						},
						{
							reps: 5,
							weight: squatMax * ( 1 - ( setIncrement * 2 ) )
						},
						{
							reps: 5,
							weight: squatMax * ( 1 - ( setIncrement * 2 ) )
						}
					];
					break;

				case Weekdays.FRIDAY:
					sets = [
						{
							reps: 5,
							weight: squatMax * ( 1 - ( setIncrement * 4 ) )
						},
						{
							reps: 5,
							weight: squatMax * ( 1 - ( setIncrement * 3 ) )
						},
						{
							reps: 5,
							weight: squatMax * ( 1 - ( setIncrement * 2 ) )
						},
						{
							reps: 5,
							weight: squatMax * ( 1 - setIncrement )
						},
						{
							reps: 3,
							weight: getMax( testSquatWeight, testSquatReps, week + 1, prWeek )
						},
						{
							reps: 8,
							weight: squatMax * ( 1 - ( setIncrement * 2 ) )
						}
					];
					break;
			}
			break;

		case Exercises.BENCH_PRESS:
			const { testBenchWeight, testBenchReps } = plan.form;
			const benchMax = getMax( testBenchWeight, testBenchReps, week, prWeek );

			switch ( weekday ) {
				case Weekdays.MONDAY:
					sets = [
						{
							reps: 5,
							weight: benchMax * ( 1 - ( setIncrement * 4 ) )
						},
						{
							reps: 5,
							weight: benchMax * ( 1 - ( setIncrement * 3 ) )
						},
						{
							reps: 5,
							weight: benchMax * ( 1 - ( setIncrement * 2 ) )
						},
						{
							reps: 5,
							weight: benchMax * ( 1 - setIncrement )
						},
						{
							reps: 5,
							weight: benchMax
						}
					];
					break;

				case Weekdays.FRIDAY:
					sets = [
						{
							reps: 5,
							weight: benchMax * ( 1 - ( setIncrement * 4 ) )
						},
						{
							reps: 5,
							weight: benchMax * ( 1 - ( setIncrement * 3 ) )
						},
						{
							reps: 5,
							weight: benchMax * ( 1 - ( setIncrement * 2 ) )
						},
						{
							reps: 5,
							weight: benchMax * ( 1 - setIncrement )
						},
						{
							reps: 3,
							weight: getMax( testBenchWeight, testBenchReps, week + 1, prWeek )
						},
						{
							reps: 8,
							weight: benchMax * ( 1 - ( setIncrement * 2 ) )
						}
					];
					break;
			}
			break;

		case Exercises.ROW:
			const { testRowWeight, testRowReps } = plan.form;
			const rowMax = getMax( testRowWeight, testRowReps, week, prWeek );

			switch ( weekday ) {
				case Weekdays.MONDAY:
					sets = [
						{
							reps: 5,
							weight: rowMax * ( 1 - ( setIncrement * 4 ) )
						},
						{
							reps: 5,
							weight: rowMax * ( 1 - ( setIncrement * 3 ) )
						},
						{
							reps: 5,
							weight: rowMax * ( 1 - ( setIncrement * 2 ) )
						},
						{
							reps: 5,
							weight: rowMax * ( 1 - setIncrement )
						},
						{
							reps: 5,
							weight: rowMax
						}
					];
					break;

				case Weekdays.FRIDAY:
					sets = [
						{
							reps: 5,
							weight: rowMax * ( 1 - ( setIncrement * 4 ) )
						},
						{
							reps: 5,
							weight: rowMax * ( 1 - ( setIncrement * 3 ) )
						},
						{
							reps: 5,
							weight: rowMax * ( 1 - ( setIncrement * 2 ) )
						},
						{
							reps: 5,
							weight: rowMax * ( 1 - setIncrement )
						},
						{
							reps: 3,
							weight: getMax( testRowWeight, testRowReps, week + 1, prWeek )
						},
						{
							reps: 8,
							weight: rowMax * ( 1 - ( setIncrement * 2 ) )
						}
					];
					break;
			}
			break;

		case Exercises.OVERHEAD_PRESS:
			const { testPressWeight, testPressReps } = plan.form;
			const pressMax = getMax( testPressWeight, testPressReps, week, prWeek );

			sets = [
				{
					reps: 5,
					weight: pressMax * ( 1 - ( setIncrement * 3 ) )
				},
				{
					reps: 5,
					weight: pressMax * ( 1 - ( setIncrement * 2 ) )
				},
				{
					reps: 5,
					weight: pressMax * ( 1 - setIncrement )
				},
				{
					reps: 5,
					weight: pressMax
				}
			];
			break;

		case Exercises.DEADLIFT:
			const { testDeadliftWeight, testDeadliftReps } = plan.form;
			const deadliftMax = getMax( testDeadliftWeight, testDeadliftReps, week, prWeek );

			sets = [
				{
					reps: 5,
					weight: deadliftMax * ( 1 - ( setIncrement * 3 ) )
				},
				{
					reps: 5,
					weight: deadliftMax * ( 1 - ( setIncrement * 2 ) )
				},
				{
					reps: 5,
					weight: deadliftMax * ( 1 - setIncrement )
				},
				{
					reps: 5,
					weight: deadliftMax
				}
			];
			break;

		default:
			sets = [];
	}

	return sets.map( ( set ) => {
		set.weight = roundToNearestPlate( set.weight, minPlateWeight );
		return set;
	} );
}
