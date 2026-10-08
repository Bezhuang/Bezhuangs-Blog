/* 站点级自定义注入。
 *
 * 主题装在 node_modules 里（npm ci 每次重装），所以任何改动都不能直接改主题源码，
 * 只能通过 Hexo 的 injector 在页面里追加样式/脚本。
 */

/* markdown 表格被渲染成 <div class="table-container">，而主题的滚动规则写的是
 * .md .table，对不上，导致宽表格被 article 的 overflow-x:hidden 直接裁掉。
 * 这里补上滚动容器，窄屏下可以横向滑动查看。 */
const TABLE_AND_MOBILE_CSS = `
<style>
.md .table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.md .table-container > table {
  width: max-content;
  min-width: 100%;
  max-width: none;
}
.md img {
  max-width: 100%;
  height: auto;
}
.md {
  overflow-wrap: break-word;
}
@media (max-width: 768px) {
  .md .table-container table,
  .md figure.highlight,
  .md figure.highlight pre,
  .md pre,
  .md code {
    font-size: .8125rem;
  }
  .md .table-container > table {
    width: max-content;
  }
  .l_main {
    width: 100%;
  }
  #l_main {
    padding-left: .75rem;
    padding-right: .75rem;
  }
}
</style>
`;

/* 主题的 head.ejs 写死了 maximum-scale=1，安卓端会禁掉双指缩放。
 * 在 meta 解析出来之后立刻改回来，保证页面可缩放（无障碍要求）。 */
const VIEWPORT_FIX = `
<script>
(function () {
  var meta = document.querySelector('meta[name="viewport"]');
  if (meta) {
    meta.setAttribute('content', 'width=device-width, initial-scale=1');
  }
})();
</script>
`;

hexo.extend.injector.register('head_end', TABLE_AND_MOBILE_CSS, 'default');
hexo.extend.injector.register('head_end', VIEWPORT_FIX, 'default');
