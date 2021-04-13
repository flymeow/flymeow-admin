<script>
export default {
  name: 'item',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props

    const vnodes = []
    if (icon) {
      // vnodes.push(<svg-icon icon-class={icon} />)
      vnodes.push(<i style="marginRight:22px;" class={'iconfont ' + icon}></i>)
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>)
    }
    return vnodes
  }
}
</script>
