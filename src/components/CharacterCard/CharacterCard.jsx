import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './CharacterCard.css';
import AttributesCard from '../AttributesCard/AttributesCard';
import CharacterClassListCard from '../CharacterClassListCard/CharacterClassListCard';
import { ATTRIBUTE_LIST, DEFAULT_ATTRIBUTE_VALUE } from '../../consts';
import { useDispatch, useSelector } from 'react-redux';
import { updateCharacterAttributes } from '../../redux/slices/characterCardsSlice';

const CharacterCard = props => {
  const characterAttributes = useSelector(state => state.characterCards.characterAttributes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!characterAttributes) {
      initState()
    }
  }, [])

  const initState = () => {
    const initAttributes = {}
    ATTRIBUTE_LIST.forEach(attribute => initAttributes[attribute] = DEFAULT_ATTRIBUTE_VALUE)
    dispatch(updateCharacterAttributes(initAttributes))
  }

  return (
    <div className="CharacterCard">
      {characterAttributes && <>
        <AttributesCard attributes={characterAttributes} />
        <CharacterClassListCard attributes={characterAttributes} />
      </>}
    </div>
  )
}

CharacterCard.propTypes = {}

export default CharacterCard