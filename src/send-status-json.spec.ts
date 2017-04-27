import { expect } from 'chai';
import * as sinon from 'sinon';

import { sendStatusJsonMiddleware } from './send-status-json';

describe("Package: send-status-json", () => {

    describe("Method: sendStatusJsonMiddleware", () => {

        it("Should return a function", () => {
            expect(typeof sendStatusJsonMiddleware()).to.eq('function');
        });

        describe("Returned function", () => {
            let func;

            beforeEach(() => func = sendStatusJsonMiddleware());

            it("Should return property sendStatusJson to object passed as a second parameter", () => {
                let res: any = {};
                func({}, res, () => { });
                expect(res.sendStatusJson).not.to.be.undefined;
            });

            it("Should call a next function passed as a third parameter", () => {
                let spy = sinon.spy();
                func({}, {}, spy);
                expect(spy.called).to.be.true;
            });

            describe("Function set to passed object", () => {

                let res: any,
                    statusSpy,
                    jsonSpy;

                beforeEach(() => {
                    res = {
                        status: () => { },
                        json: () => { }
                    }

                    statusSpy = sinon.spy(res, 'status');
                    jsonSpy = sinon.spy(res, 'json');

                    func({}, res, () => { })
                });

                it("Should call express response object's status method with passed statusCode", () => {
                    res.sendStatusJson(401);
                    expect(statusSpy.calledWith(401)).to.be.true;

                    statusSpy.reset();

                    res.sendStatusJson(200);
                    expect(statusSpy.calledWith(200)).to.be.true;
                });

                it("Should call express response object's json method with an object with status and statusText", () => {
                    res.sendStatusJson(404);

                    let callArgs = jsonSpy.args[0][0];
                    expect(callArgs.status).to.eq(404);
                    expect(callArgs.statusText).to.eq('Not Found');
                });

                it("Should add passed custom properties to response object", () => {
                    res.sendStatusJson(200, { custom1: "Custom1", obj: { subProp: 'SubProp' } });

                    let callArgs = jsonSpy.args[0][0];
                    expect(callArgs.custom1).to.eq('Custom1');
                    expect(callArgs.obj.subProp).to.eq('SubProp');
                });

            });
        });
    });
});