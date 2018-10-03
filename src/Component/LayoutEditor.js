import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import GridLayout from 'react-grid-layout';
import PropTypes from 'prop-types';

class LayoutEditor extends Component {
  constructor(props) {
    super(props);

    this.getGridBackground   = this.getGridBackground.bind(this);
    this.getComponentContent = this.getComponentContent.bind(this);
  }

  getComponentContent(i) {
    const meta = this.props.layout[this.props.parent.i].find(e => e.i === i).meta;

    if (!meta || !meta.tag) {
      return meta.content ? { text: meta.content, tooltip: 'Free text' } : {};
    }

    const example = meta.tag.example;

    return {
      text: (!example || typeof example === typeof []) ? '' : example,
      tooltip: meta.tag.label
    };
  }

  getGridBackground(cellSize, cols, margin = 0) {
    const content = Array.apply(null, { length: cols + 1 }).map(Number.call, Number)
      .map(
        (a, i) =>
          `<rect stroke='rgb(0, 0, 0, 0.03)' stroke-width='1' fill='none' x='${Math.round(
            margin / 2 + i * cellSize,
          )}' y='${margin / 2}' width='${Math.round(
            cellSize - margin,
          )}' height='${cellSize - margin}'/>`,
      )
      .join('');

    return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${cellSize * cols}' height='${cellSize}'>${content}</svg>")`;
  }

  render() {
    const parentId = this.props.parent.i;

    if (!this.props.layout[parentId]) {
      return '';
    }

    // Paper width, TODO: refactor when add support for different page sizes
    let width = 595;
    const cellSize = 15;

    if (parentId !== 'root') {
      const parentElement = document.querySelector('#component-' + parentId);

      if (!parentElement) {
        return '';
      }

      width = parentElement.offsetWidth;
    }

    const layout = this.props.layout[parentId];

    let layoutMode = 'absolute';

    if (parentId === 'root') {
      layoutMode = this.props.page.layoutRelative ? 'relative' : layoutMode;
    } else {
      layoutMode = this.props.parent.meta.layoutRelative ? 'relative' : layoutMode;
    }

    const cols = width / cellSize;
    let backgroundImage = '';

    // Show grid only in the root element
    if (parentId === 'root') {
      backgroundImage = this.getGridBackground(15, cols);
    }

    return(
      <div
       style={{ backgroundImage }}
      >
        <GridLayout
          layout={layout}
          cols={width / cellSize}
          rowHeight={cellSize}
          width={width}
          maxRows={this.props.parent.h}
          containerPadding={[0, 0]}
          isDraggable={parentId === this.props.selectedGroupId}
          margin={[0, 0]}
          compactType={layoutMode === 'absolute' ? null : 'vertical'}
          preventCollision={layoutMode === 'absolute'}
          onLayoutChange={layout => this.props.onChangeLayout(layout, parentId)}
        >
          {layout.map(
            e => {
              const classes = this.props.selectedUuid === e.i ? 'active' : '';
              const content = this.getComponentContent(e.i);
              const { meta } = e;

              const textStyle = {
                position: 'absolute',
                textAlign: meta.horizontalAlignment,
                width: '100%',
                fontFamily: meta.fontFamily,
                fontSize: Number(meta.fontSize || 16),
                color: meta.color
              };

              if (meta.verticalAlignment === 'middle') {
                textStyle.top = '50%';
                textStyle.transform = 'translateY(-50%)'
              } else if (meta.verticalAlignment === 'bottom') {
                textStyle.bottom = 0;
              }

              if (layoutMode === 'relative') {
                e.w = cols;
                e.minW = cols;
              } else {
                delete e.minW;
              }

              return (
                <div
                  id={'component-' + e.i}
                  className={classes}
                  key={e.i}
                  data-grid={e}
                  onClick={(event) => event.stopPropagation() || this.props.onSelectElement(e.i)}
                  onDragEnd={e => e.stopPropagation()}
                  style={{ boxSizing: 'border-box'}}
                >
                  <Tooltip title={content.tooltip || ''}>
                    <span style={textStyle}>
                      {content.text}
                    </span>
                  </Tooltip>

                  <LayoutEditor {...this.props} parent={e} />
                </div>
              );
            })
          }
        </GridLayout>
      </div>
    );
  }
}

LayoutEditor.propTypes = {
  selectedUuid: PropTypes.string,
  parent: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
  onSelectElement: PropTypes.func.isRequired,
  onChangeLayout: PropTypes.func.isRequired,
  onDoConfigure: PropTypes.func.isRequired,
  onDeleteElement: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired,
  onClearHistory: PropTypes.func.isRequired
};

export default LayoutEditor;
