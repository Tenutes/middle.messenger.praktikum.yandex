export default (tpl: TemplateFn, ctx: IState | null): string => <string>tpl(ctx);
