/*
 * Ryserson Cybersecurity Research Lab
 * Dave McKay
 *
 * SPDX-License-Identifier: MIT
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Evaluation extends Contract {

    async InitLedger(ctx) {
        await ctx.stub.putState('StateData', Buffer.from('0'));
        console.info('Evaluation stateData initialized');
    }

    // Write the stateData value.
    async WriteState(ctx, _stateData) {
        ctx.stub.putState('StateData', Buffer.from(_stateData));
        await this.ctx.stub.setEvent('watchState', Buffer.from(JSON.stringify(stateData)));
        return _stateData;
    }

    // Read the stateData value.
    async ReadState(ctx) {
        const _stateData = await ctx.stub.getState('StateData'); 
        return _stateData;
    }

    // Call the interop function
    async callInterop(ctx, _interopDID, _func, _callerDID, _nonce, _sig) {
        const _stateData = await ctx.stub.getState('StateData'); 
        let callData = {
            interopDID: _interopDID,
            func: _func,
            value: _stateData,
            callerDID, _callerDID,
            nonce: _nonce,
            sig: _sid,                              // encrypted hash of previous values
            txID: ctx.stub.getTxID(),               // transaction proposal ID
            userID: ctx.clientIdentity.getID(),     // user ID
            orgID: ctx.clientIdentity.getMSPID()    // org information
        }
        await this.ctx.stub.setEvent('interopCall', Buffer.from(JSON.stringify(callData)));
    }
}

module.exports = Evaluation;
