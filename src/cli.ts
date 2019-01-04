import 'reflect-metadata';
import {controller, action, build} from 'inversify-commander-utils';
import {Container, inject, injectable} from 'inversify';
import * as commander from 'commander';

@injectable()
class TodoContainer {
    public printPaper() {
        return 'Paper';
    }
}

@controller('printer')
class TestController {

    @inject(TodoContainer)
    public todoContainer!: TodoContainer;

    @action('A')
    public testA() {
        console.log(this.todoContainer.printA());
    }

}

const container = new Container();
container.bind(TodoContainer).to(TodoContainer);
build(commander, container);

commander
    .parse(process.argv);
