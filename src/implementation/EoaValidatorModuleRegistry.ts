import {ILuniverseService} from "@hanwha-blockchain/ha-ethereum-module-common";
import {TrustedGroupSenderValidator} from "@hanwha-blockchain/ha-ethereum-module-trusted-group-sender-validator/lib";
import {TrustedGroupRecipientValidator} from "@hanwha-blockchain/ha-ethereum-module-trusted-group-recipient-validator/lib";

export class EoaValidatorModuleRegistry {

    private luniverseService: ILuniverseService;

    private trustedGroupSenderValidator: TrustedGroupSenderValidator;
    private trustedGroupRecipientValidator: TrustedGroupRecipientValidator;


    constructor(luniverseServiceImpl: ILuniverseService) {
        this.luniverseService = luniverseServiceImpl;
    }

    private createInstance<T>(type: (new (luniverseServiceImpl: ILuniverseService) => T)): T {
        return (new type(this.luniverseService));
    }

    private initialize(validatorName: string, validatorCA: string): Object {

        let instance: any;

        switch (validatorName) {
            case 'TrustedGroupSenderValidator':{
                instance = this.createInstance(TrustedGroupSenderValidator);
                break;
            }
            case 'TrustedGroupRecipientValidator':{
                instance = this.createInstance(TrustedGroupRecipientValidator);
                break;
            }
        }

        //
        // if (validatorName === 'TrustedGroupSenderValidator') {
        //
        //     instance = this.createInstance(TrustedGroupSenderValidator);
        //
        // } else if (validatorName === 'TrustedGroupRecipientValidator') {
        //
        //     instance = this.createInstance(TrustedGroupRecipientValidator);
        // }

        if (instance instanceof Object) {
            instance.setAddress(validatorCA);
        } else {
            throw new Error('Invalid Instance');
        }

        return instance;
    }

    public async callValidator(validatorName: string, validatorCA: string, functionName: string, validatorParams: any[], fromAddress: string): Promise<any> {

        const propertyKey = validatorName.charAt(0).toLowerCase() + validatorName.substring(1, validatorName.length);

        let module = Reflect.get(this, propertyKey);

        if (!(module instanceof Object)) {
            module = await this.initialize(validatorName, validatorCA);
        }

        let methodNames: any;
        for (let i = 0; i < Object.keys(module).length; i++) {
            if (module['contractAbi']) {
                methodNames = module['contractAbi'];
                break;
            }
        }

        if (methodNames === '') {
            throw new Error('Invalid MethodNames');
        }

        let registerFunctionName = '';
        for (let i = 0; i < methodNames.length; i++) {
            if (methodNames[i].type === 'function') {
                if (methodNames[i].name.includes(functionName)) {
                    registerFunctionName = methodNames[i].name;
                    break;
                }
            }
        }

        if (registerFunctionName === '') {
            throw new Error('Invalid Function Name');
        }

        const args = [... Object.values(validatorParams), fromAddress];

        return await Reflect.apply(module[registerFunctionName], module, args);

    }
}
