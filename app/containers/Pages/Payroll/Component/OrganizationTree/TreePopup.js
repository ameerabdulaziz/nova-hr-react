import OrganizationChart from '@dabeng/react-orgchart';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import payrollMessages from '../../messages';

function TreePopup(props) {
  const {
    intl, isOpen, setIsOpen, tree, onSave, chartData
  } = props;
  const [clonedTree, setClonedTree] = useState(tree);

  useEffect(() => {
    setClonedTree(tree);
  }, [tree]);

  const closePopup = () => {
    setIsOpen(false);
  };

  const onClickNode = (nodeData) => {
    const node = clonedTree.find(nodeData.id);

    if (node?.disabled) {
      return;
    }

    setClonedTree((prevTree) => {
      const newTree = prevTree.clone();
      newTree.addIsCheckProperty(
        nodeData.id,
        !newTree.find(nodeData.id)?.isCheck
      );
      return newTree;
    });
  };

  const MyNode = ({ nodeData }) => {
    const node = clonedTree.find(nodeData.id);

    return (
      <Button
        variant='text'
        disabled={node?.disabled}
        startIcon={
          node?.isCheck ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />
        }
      >
        {nodeData.value}
      </Button>
    );
  };

  const onSaveBtnClick = () => {
    onSave(clonedTree);
    closePopup();
  };

  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        sx: (th) => ({
          [th.breakpoints.down('md')]: {
            width: '100%',
          },
          width: '80vw',
          maxWidth: '80vw',
        }),
      }}
    >
      <DialogTitle>{intl.formatMessage(payrollMessages.organizationTree)}</DialogTitle>

      <DialogContent>
        <Box
          sx={{
            '.orgchart ': {
              'ul li .oc-node': {
                '&.selected, &:hover': {
                  backgroundColor: 'transparent',
                },
              },
              '& > ul > li > ul li::before': {
                borderTopColor: '#215a88',
              },
              '& > ul > li > ul li > .oc-node::before, & ul li .oc-node:not(:only-child)::after':
                {
                  backgroundColor: '#215a88',
                },
            },
            '.orgchart-container': {
              height: '500px',
            },
          }}
        >
          <OrganizationChart
            datasource={chartData}
            NodeTemplate={MyNode}
            pan
            zoom
            collapsible={false}
            onClickNode={onClickNode}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={closePopup}>
          {intl.formatMessage(payrollMessages.close)}
        </Button>
        <Button onClick={onSaveBtnClick} variant='contained'>
          {intl.formatMessage(payrollMessages.save)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

TreePopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  tree: PropTypes.object.isRequired,
  chartData: PropTypes.array.isRequired,
};

export default injectIntl(TreePopup);
