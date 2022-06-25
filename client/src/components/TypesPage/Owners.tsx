import React from 'react';
import { IOwner } from "src/interfaces/user.interface";

interface IOwnersProps {
    owners: Array<IOwner>;
}

const Owners = ({ owners }: IOwnersProps) => {
    return (
        <div>Owners</div>
    )
}

export default Owners;