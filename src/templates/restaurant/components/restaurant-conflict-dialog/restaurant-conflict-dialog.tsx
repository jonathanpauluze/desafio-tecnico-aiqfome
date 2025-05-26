'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button
} from '@/ui'

type RestaurantConflictDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCancel?: () => void
  onConfirm?: () => void
}

export function RestaurantConflictDialog(
  props: Readonly<RestaurantConflictDialogProps>
) {
  const { open, onOpenChange, onCancel, onConfirm } = props

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%]">
        <DialogHeader>
          <DialogTitle>Limpar carrinho?</DialogTitle>
          <DialogDescription>
            Seu carrinho contém itens de outro restaurante. Deseja limpá-lo e
            adicionar este novo item?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-4">
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
