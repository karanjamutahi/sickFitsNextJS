import Link from 'next/link'

import Reset from '../../../components/Reset';

const passwordReset = props => {
    const { userID, token } = props.query;
    return(
        <Reset resetToken={token}></Reset>
    )
};

export default passwordReset;