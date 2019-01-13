import 'reflect-metadata';
import {group, action, build, registerGroups} from 'inversify-commander-utils';
import {Container, inject, injectable} from 'inversify';
import program from 'commander';

@injectable()
class TodoContainer {
    public printPaper() {
        return 'Paper';
    }
}

@group('printer')
class TestController {

    @inject(TodoContainer)
    public todoContainer!: TodoContainer;

    @action(
        'A <parameter>',
        [
            { pattern: '-c, --count <mode>', description: 'Number of prints.' }
        ]
    )
    public testA(parameter: string, command: any) {
        console.log(this.todoContainer.printPaper());
        console.log(parameter, command.count);
    }

}

const container = new Container();
container.bind(TodoContainer).to(TodoContainer);
registerGroups(container);
build(program, container);

program
    .parse(process.argv);
