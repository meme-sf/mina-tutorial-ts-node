import {
  Field,
  SmartContract,
  state,
  State,
  DeployArgs,
  Permissions,
  method,
} from 'snarkyjs';

export class Square extends SmartContract {
  @state(Field) num = State<Field>();

  deploy(args: DeployArgs) {
    super.deploy(args);

    this.setPermissions({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
    });
  }

  @method init() {
    this.num.set(Field(3));
  }

  @method update(square: Field) {
    const currentState = this.num.get();
    this.num.assertEquals(currentState);
    square.assertEquals(currentState.mul(currentState));
    this.num.set(square);
  }
}
