/**
 * External dependencies
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Internal dependencies
 */

import { toggleHeaderOptionsActive } from 'state/ui/actions';
import { isHeaderOptionsActive } from 'state/ui/selectors';
import Button from 'components/button';
import Icon from 'components/icon';
import HeaderOptions from 'layout/header-options';

function Header( { title, headerOptionsActive, toggleHeaderOptions } ) {
	function toggleOptions( event ) {
		event.preventDefault();
		event.stopPropagation();
		toggleHeaderOptions();
	}

	return (
		<header className="header">
			<div className="header__content">
				<Button plain to="/" className="header__home">
					<Icon icon="home" />
				</Button>
				<span className="header__brand">
					{ title }
				</span>
				<span
					aria-role="button"
					aria-pressed={ headerOptionsActive }
					onClick={ toggleOptions }
					className="header__options">
					<span>
						<Icon icon="cog">
							Options
						</Icon>
						<HeaderOptions
							className="header__options-menu" />
					</span>
				</span>
			</div>
		</header>
	);
}

Header.propTypes = {
	title: PropTypes.node,
	headerOptionsActive: PropTypes.bool,
	toggleHeaderOptions: PropTypes.func
};

Header.defaultProps = {
	toggleHeaderOptions: () => {}
};

export default connect(
	( state ) => {
		return {
			headerOptionsActive: isHeaderOptionsActive( state )
		};
	},
	( dispatch ) => {
		return bindActionCreators( {
			toggleHeaderOptions: toggleHeaderOptionsActive
		}, dispatch );
	}
)( Header );
