import React from 'react'
import PropTypes from 'prop-types'
import './AttributesCard.css';
import { STRING_CONSTANTS } from '../../consts';
import PointsInputControl, { PointsInputControlType } from '../PointsInputControl/PointsInputControl';
import { useDispatch } from 'react-redux';
import { updateCharacterAttributes } from '../../redux/slices/characterCardsSlice';

const AttributesCard = props => {
  const {attributes} = props;
  const dispatch = useDispatch();

  const handlePointChange = (attribute, value) => {
    dispatch(updateCharacterAttributes({...attributes, [attribute]: value}))
  }

  return (
    <div className="AttributesCard">
      <h3>{STRING_CONSTANTS.Attributes}</h3>
      {Object.keys(attributes).map((attribute, key) =>
        <PointsInputControl key={key} name={attribute} value={attributes[attribute]} type={PointsInputControlType.Attribute} onChange={(val)=>handlePointChange(attribute, val)}/>
      )
      }
    </div>
  )
}

AttributesCard.propTypes = {
  attributes: PropTypes.object.isRequired
}

export default AttributesCard