import { useContext } from 'react';
import { Context } from '@context';
import { useInput } from '@hooks';
import { Avatar } from '@components';
import { Button, FileInput, Input, TextArea } from '@components/forms';
import { validationChains } from '@services';
import PropTypes from 'prop-types';
import { close, photo } from '@assets/icons';
import * as S from './ProfileForm.styles';

function ProfileForm({ profile, onSubmit, backgroundFile, avatarFile }) {
  const { user } = useContext(Context);

  const {
    value: displayName,
    updateValue: updateDisplayName,
    validation: displayNameValidation,
  } = useInput({
    initialValue: profile.displayName,
    validate: validationChains.displayName,
  });
  const {
    value: bio,
    updateValue: updateBio,
    validation: bioValidation,
  } = useInput({ initialValue: profile.bio, validate: validationChains.bio });
  const {
    value: location,
    updateValue: updateLocation,
    validation: locationValidation,
  } = useInput({
    initialValue: profile.location,
    validate: validationChains.location,
  });
  const {
    value: website,
    updateValue: updateWebsite,
    validation: websiteValidation,
  } = useInput({
    initialValue: profile.website,
    validate: validationChains.website,
  });

  const validations = [
    displayNameValidation,
    bioValidation,
    locationValidation,
    websiteValidation,
  ];
  const isValid = validations.every((v) => v.isValid);

  return (
    <S.ProfileForm
      onSubmit={async (e) => {
        e.preventDefault();
        onSubmit({ displayName, bio, location, website });
      }}
    >
      <S.FileContainer>
        {backgroundFile.url ||
          (profile.background && (
            <S.File src={backgroundFile.url || profile.background} alt="" />
          ))}
        {backgroundFile.url && (
          <button
            onClick={backgroundFile.remove}
            aria-label="remove background"
          >
            <img src={close} alt="" />
          </button>
        )}
        <FileInput
          onChange={(e) =>
            backgroundFile.update(user, e.target.files[0], 'backgrounds')
          }
          image={photo}
        />
      </S.FileContainer>
      <S.FileContainer>
        {avatarFile.url ||
          (profile.avatar && (
            <Avatar profile={{ avatar: avatarFile.url || profile.avatar }} />
          ))}
        <FileInput
          onChange={(e) =>
            avatarFile.update(user, e.target.files[0], 'avatars')
          }
          image={photo}
        />
      </S.FileContainer>
      <Input
        name="displayName"
        value={displayName}
        updateValue={updateDisplayName}
        validation={displayNameValidation}
        maxLength={50}
        label="Name"
      />
      <TextArea
        name="bio"
        value={bio}
        updateValue={updateBio}
        validation={bioValidation}
        label="Bio"
        maxLength={160}
      />
      <Input
        name="location"
        value={location}
        updateValue={updateLocation}
        validation={locationValidation}
        maxLength={30}
        optional={true}
      />
      <Input
        name="website"
        value={website}
        updateValue={updateWebsite}
        validation={websiteValidation}
        maxLength={100}
        optional={true}
      />
      <Button
        type={isValid ? 'submit' : 'button'}
        disabled={user.loginMethod === 'GUEST'}
      >
        Save
      </Button>
    </S.ProfileForm>
  );
}

ProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  backgroundFile: PropTypes.object.isRequired,
  avatarFile: PropTypes.object.isRequired,
};

export default ProfileForm;
