import { Fragment } from 'react';

export default props => {
  const { profileImg, firstName } = props;
  return (
    <Fragment>
      {profileImg ? (
        <img src={profileImg} alt={firstName} />
      ) : (
        <i className="fa fa-user" aria-hidden="true" />
      )}

      <style jsx>{`
        i {
          font-size: 26px;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      `}</style>
    </Fragment>
  );
};
