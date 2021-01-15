import {ILuniverseSetting, LuniverseService, TransactionUtil} from '@hanwha-blockchain/ha-luniverse-wrapper/lib/src';


import {TrustedGroupSenderValidator} from '@hanwha-blockchain/ha-ethereum-module-trusted-group-sender-validator/lib';
import {TrustedGroupRecipientValidator} from '@hanwha-blockchain/ha-ethereum-module-trusted-group-recipient-validator/lib';
import {EoaValidatorModuleRegistry} from "../src";


const assert = require('chai').assert;
const expect = require('chai').expect;

// Address
const Issuer = '0x3fbe8a47c5c62e76883acfde19059d7ae699840d';
const Broker = '0x283bb870c702663889c2f090e0aa1a0fb15d3ae5';

const LUNIVERSE_BASE_URL = 'https://api.luniverse.dev';

// auth key info
const ACCESS_KEY = 'KM6QHxAjfDdFHuBdk3BAEfymJ5jjueySGZSxSXUiNRaudxYqMG8tmvxMtyDt6PAp';
const SECRET_KEY = '2khCc9x8EGxgQwbTzKBBspZGLg9F37BbCQquReE5CLsF9ZNEMN2mHKg4iM6ripiaJ9QQ2k5qQ8jJeqi5LdKdR6RRxrs3viw6mTNuLEp6iUXm2rb8HHWgC2AkwFKrwcYc';
const API_KEY_ID = 'apiKeyId';

// luniverse info
const ENV_ID = '1604897577064948129';
const EMAIL = 'moonyong.park@hanwha.com';
const PWD = ')fqLZv37s#';

// account info
const OWNER_ADDRESS = '0x7b6f686e14a4a2f02fbf81c2f9ed49984eaee0bb';

const tokenName = 'HanwhaSecurityToken_Test1'; // 'HanwhaSecurityToken'; // test 전 입력 필요
const tokenSymbol = '0x7465737400000000000000000000000000000000000000000000000000000000'; // 'HST'; // test 전 입력 필요
const tokenGranularity = 1; // test 전 입력 필요

const _ADDRESS = '0x7b6f686e14a4a2f02fbf81c2f9ed49984eaee0bb';



const InvestorA = '0xd6c762ddfd3e8eba4721ee8b51d16d240236163e'; // spiderman@hanwha.com
const InvestorB = '0xf8e462ccfdd76109cacdd714d00fb2e65fe44d5a'; // ironman@hanwha.com
const InvestorC = '0xF809D9AA060b03AB4Ff4B66E8459234c11EED732';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';

const DEFAULT_PARTITION = '0x64656661756c7400000000000000000000000000000000000000000000000000';
const LOCKED_PARTITION = '0x6c6f636b65640000000000000000000000000000000000000000000000000000';

const TRANSFER_KEY = 0;
const ISSUANCE_KEY = 1;
const REDEEM_KEY = 2;
const SEND_KEY = 5;
const RECEIVE_KEY = 6;

const TRUSTED_TRANSFER_VALIDATOR = '0x9d90dea1b3fbb97943c9dc67638f6dac6f114404';
const TRUSTED_WALLETS = '0xa9de7642df1178ae2eea021a40b8c16082a6e244';

// TRUSTED_GROUP_SENDER_VALIDATOR Account info

const TRUSTED_GROUP_SENDER_VALIDATOR_CONTRACT_NAME = 'trustedGroupSenderValidator';
const TRUSTED_GROUP_SENDER_VALIDATOR_CONTRACT_ADDRESS = '0xd1e7925cb1841100a2b9df66fde3e750e850d7c2';
const TRUSTED_WALLETS_CONTRACT_ADDRESS = '0xa9de7642df1178ae2eea021a40b8c16082a6e244';


describe('TestContract Contract function test', async function () {
    this.timeout(1000000);

    let eoaValidatorModuleRegistry: EoaValidatorModuleRegistry;

    let trustedGroupSenderValidator: TrustedGroupSenderValidator;
    let trustedGroupRecipientValidator: TrustedGroupRecipientValidator;

    let securityTokenAddress: string;

    before('Set Instance', function () {
        let luniverseSetting = <ILuniverseSetting>{
            accessKey: ACCESS_KEY,
            secretKey: SECRET_KEY,
            apiKeyId: API_KEY_ID,
            environmentId: ENV_ID,
            email: EMAIL,
            password: PWD,
            httpUtil: new TransactionUtil('Luniverse', LUNIVERSE_BASE_URL, 1000000),
        };

        let luniverseService = new LuniverseService(luniverseSetting);

        eoaValidatorModuleRegistry = new EoaValidatorModuleRegistry(this.luniverseService);

        trustedGroupSenderValidator = new TrustedGroupSenderValidator(this.luniverseService);
        trustedGroupRecipientValidator = new TrustedGroupRecipientValidator(this.luniverseService);

    });

    it('1. TrustedTransferValidator', async function() {

        let params = [
            TRUSTED_WALLETS,
            Issuer,
            Issuer
        ];

        let resCallValidator = await eoaValidatorModuleRegistry.callValidator(
            'TrustedGroupSenderValidator',
            '0xd1e7925cb1841100a2b9df66fde3e750e850d7c2',
            'registerTrustedGroups',
            params,
            OWNER_ADDRESS
        );

        // let resRegister = await validatorModuleRegistry.registerValidator(
        //     'TrustedTransferValidator',
        //     TRUSTED_TRANSFER_VALIDATOR,
        //     obj,
        //     Issuer
        // );

        console.log('resCallValidator: ', resCallValidator);

    });
});
